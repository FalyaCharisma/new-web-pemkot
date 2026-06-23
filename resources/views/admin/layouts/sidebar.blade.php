<!-- Sidebar -->
<div class="sidebar" data-background-color="dark">
    <div class="sidebar-logo">
        <!-- Logo Header -->
        <div class="logo-header" data-background-color="dark">
        <a href="index.html" class="logo">
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
            @foreach ($appAdminSidebar as $item)
                @if (isset($item['children']) && count($item['children']) > 0)
                <li @class(['nav-item submenu', 'active' => Request::is(...$item['routes']) ]) >
                    <a data-bs-toggle="collapse" href="#collapse-{{ $loop->index }}">
                        <i class="fas {{ $item['icon'] }}"></i>
                        <p>{{ $item['title'] }}</p>
                        <span class="caret"></span>
                    </a>
                    <div @class(['collapse', 'show' => Request::is(...$item['routes']) ]) id="collapse-{{ $loop->index }}">
                        <ul class="nav nav-collapse">
                            @foreach ($item['children'] as $child)
                            <li @class(['active' => Request::is(...$child['routes']) ]) >
                                <a href="{{ $child['url'] }}">
                                <span class="sub-item">{{ $child['title'] }}</span>
                                </a>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                </li>
                @else
                <li @class(['nav-item', 'active' => Request::is(...$item['routes']) ]) >
                    <a href="{{ $item['url'] }}">
                        <i class="fas {{ $item['icon'] }}"></i>
                        <p>{{ $item['title'] }}</p>
                    </a>
                </li>
                @endif
            @endforeach
            </ul>
        </div>
    </div>
</div>
<!-- End Sidebar -->
