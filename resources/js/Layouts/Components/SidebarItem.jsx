import SimpleSidebarItem from "@/Layouts/Components/SimpleSidebarItem";
import { router } from "@inertiajs/react";
import CollapsibleSidebarItem from "./CollapsibleSidebarItem";

export default function SidebarItem({ module, currentRoute, sidebarIsOpen }) {
  const handleOnClick = (route) => router.visit(route);

  if (module.children.length > 0) {
    return (
      <CollapsibleSidebarItem
        module={module}
        currentRoute={currentRoute}
        onClick={handleOnClick}
        sidebarIsOpen={sidebarIsOpen}
      />
    );
  }

  return (
    <SimpleSidebarItem
      module={module}
      isSelected={module.route === currentRoute}
      onClick={handleOnClick}
      sidebarIsOpen={sidebarIsOpen}
    />
  );
}
