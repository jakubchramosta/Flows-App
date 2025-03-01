function SidebarMenu() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li className="opcion-con-desplegable">
            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
              <div className="flex items-center">
                <i className="fas fa-calendar-alt mr-2"></i>
                <span>Main</span>
              </div>
              <i className="fas fa-chevron-right mr-2 text-xs"></i>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SidebarMenu;
