<!-- Sidebar -->
<div class="sidebar" data-background-color="dark">

    <div class="sidebar-logo">

        <!-- Logo Header -->
        <div class="logo-header" data-background-color="dark">

            <a href="{{ url('/dashboard') }}" class="logo">
                <h4 style="color:white;">ADMINPAGE</h4>
            </a>

            <div class="nav-toggle">

                <button class="btn btn-toggle toggle-sidebar">
                    <i class="gg-menu-right"></i>
                </button>

                <button class="btn btn-toggle sidenav-toggler">
                    <i class="gg-menu-left"></i>
                </button>

            </div>

            <button class="topbar-toggler more">
                <i class="gg-more-vertical-alt"></i>
            </button>

        </div>
        <!-- End Logo Header -->

    </div>


    <div class="sidebar-wrapper scrollbar scrollbar-inner">

        <div class="sidebar-content">

            <ul class="nav nav-secondary">

                @php
                    // Ambil role user yang sedang login
                    $role = auth()->check()
                        ? (int) auth()->user()->role
                        : null;
                @endphp


                @foreach ($appAdminSidebar as $item)

                    {{-- =====================================================
                        CEK ROLE MENU UTAMA
                    ====================================================== --}}

                    @php
                        $showParent = true;

                        /*
                         * Kalau parent memiliki roles,
                         * cek apakah role user diperbolehkan.
                         */
                        if (isset($item['roles'])) {
                            $showParent = in_array(
                                $role,
                                $item['roles']
                            );
                        }
                    @endphp


                    {{-- Kalau parent tidak boleh, jangan tampilkan --}}
                    @if (!$showParent)
                        @continue
                    @endif


                    {{-- =====================================================
                        MENU YANG MEMILIKI CHILDREN
                    ====================================================== --}}

                    @if (isset($item['children']) && count($item['children']) > 0)

                        {{-- 
                            Cek apakah parent mempunyai minimal
                            satu child yang boleh ditampilkan
                        --}}

                        @php
                            $visibleChildren = collect($item['children'])
                                ->filter(function ($child) use ($role) {

                                    // Child tanpa roles
                                    // hanya boleh untuk role 0 dan 1
                                    if (!isset($child['roles'])) {
                                        return in_array($role, [0, 1]);
                                    }

                                    // Child dengan roles
                                    return in_array(
                                        $role,
                                        $child['roles']
                                    );
                                });
                        @endphp


                        {{-- Kalau tidak ada child yang boleh tampil,
                             parent juga tidak ditampilkan --}}

                        @if ($visibleChildren->count() === 0)
                            @continue
                        @endif


                        <li @class([
                            'nav-item submenu',
                            'active' => Request::is(...$item['routes'])
                        ])>

                            <a
                                data-bs-toggle="collapse"
                                href="#collapse-{{ $loop->index }}"
                            >

                                <i class="fas {{ $item['icon'] }}"></i>

                                <p>
                                    {{ $item['title'] }}
                                </p>

                                <span class="caret"></span>

                            </a>


                            <div
                                @class([
                                    'collapse',
                                    'show' => Request::is(...$item['routes'])
                                ])
                                id="collapse-{{ $loop->index }}"
                            >

                                <ul class="nav nav-collapse">

                                    {{-- Gunakan child yang sudah difilter --}}
                                    @foreach ($visibleChildren as $child)

                                        <li @class([
                                            'active' => Request::is(...$child['routes'])
                                        ])>

                                            <a href="{{ $child['url'] }}">

                                                <span class="sub-item">
                                                    {{ $child['title'] }}
                                                </span>

                                            </a>

                                        </li>

                                    @endforeach

                                </ul>

                            </div>

                        </li>


                    {{-- =====================================================
                        MENU BIASA TANPA CHILDREN
                    ====================================================== --}}

                    @else

                        <li @class([
                            'nav-item',
                            'active' => Request::is(...$item['routes'])
                        ])>

                            <a href="{{ $item['url'] }}">

                                <i class="fas {{ $item['icon'] }}"></i>

                                <p>
                                    {{ $item['title'] }}
                                </p>

                            </a>

                        </li>

                    @endif

                @endforeach

            </ul>

        </div>

    </div>

</div>
<!-- End Sidebar -->