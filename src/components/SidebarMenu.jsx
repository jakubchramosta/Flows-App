function SidebarMenu() {
  return (
    <aside class="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul class="space-y-2">
          <li class="opcion-con-desplegable">
            <div class="flex items-center justify-between p-2 hover:bg-gray-700">
              <div class="flex items-center">
                <i class="fas fa-calendar-alt mr-2"></i>
                <span>Main</span>
              </div>
              <i class="fas fa-chevron-right mr-2 text-xs"></i>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SidebarMenu;
