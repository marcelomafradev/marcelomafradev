import DropdownSettings from '../dropdown-settings';
import SpotifyIndicator from './spotify-indicator';

const Sidebar = () => {
  return (
    <aside className="relative flex h-screen flex-col justify-between border-r md:w-72">
      <div>Menu items</div>

      <div className="flex items-center justify-between gap-6 pb-3 pl-2 pr-3">
        <SpotifyIndicator />
        <DropdownSettings />
      </div>
    </aside>
  );
};

export default Sidebar;
