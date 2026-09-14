<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class SplpService
{
    /**
     * Mengambil access token dari SPLP.
     */
    private function getAccessToken(): string
    {
        $cachedToken = Cache::get('splp_access_token');

        if ($cachedToken) {
            return $cachedToken;
        }

        $response = Http::asForm()
            ->withHeaders([
                'Authorization' => 'Basic ' . config('services.splp.basic_auth'),
                'Accept' => 'application/json',
            ])
            ->post(
                config('services.splp.token_url'),
                [
                    'grant_type' => 'client_credentials',
                ]
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Gagal mengambil token SPLP: '
                . $response->status()
                . ' - '
                . $response->body()
            );
        }

        $data = $response->json();

        if (empty($data['access_token'])) {
            throw new RuntimeException(
                'Access token SPLP tidak ditemukan.'
            );
        }

        /*
        * expires_in dari API berupa detik.
        * Contoh:
        * expires_in = 3600 berarti token berlaku 60 menit.
        *
        * Token disimpan 5 menit lebih singkat agar tidak digunakan
        * ketika sudah mendekati masa kedaluwarsa.
        */
        $expiresIn = (int) ($data['expires_in'] ?? 3600);

        $cacheDuration = max($expiresIn - 300, 60);

        Cache::put(
            'splp_access_token',
            $data['access_token'],
            now()->addSeconds($cacheDuration)
        );

        return $data['access_token'];
    }

    private function getFromSplp(string $endpoint): array
    {
        $response = Http::withToken($this->getAccessToken())
            ->acceptJson()
            ->get(
                config('services.splp.api_url') . $endpoint
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Gagal mengambil data SPLP: '
                . $response->status()
                . ' - '
                . $response->body()
            );
        }

        return $response->json();
    }

    public function getGempaTerkini(): array
    {
        return $this->getFromSplp(
            '/gempabumi-tsunami/1.0/gempabumi-terkini'
        );
    }

    public function getGempaM5(): array
    {
        return $this->getFromSplp(
            '/gempabumi-tsunami/1.0/gempabumi-m5'
        );
    }

    public function getGempaDirasakan(): array
    {
        return $this->getFromSplp(
            '/gempabumi-tsunami/1.0/gempabumi-dirasakan'
        );
    }

    public function getGempaTsunami(): array
    {
        return $this->getFromSplp(
            '/gempabumi-tsunami/1.0/tsunami'
        );
    }
}