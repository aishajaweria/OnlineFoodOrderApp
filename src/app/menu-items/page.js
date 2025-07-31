'use client';
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {

  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true); // <-- add this
  const { loading, data } = useProfile();

  useEffect(() => {
    setMenuLoading(true);
    fetch('/api/menu-items')
      .then(async res => {
        if (!res.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const text = await res.text();
        if (!text) {
          setMenuItems([]);
          setMenuLoading(false);
          return;
        }
        try {
          const menuItems = JSON.parse(text);
          setMenuItems(menuItems);
        } catch (err) {
          console.error("Error parsing menu items JSON:", err);
          setMenuItems([]);
        }
        setMenuLoading(false);
      })
      .catch(err => {
        console.error("Error fetching menu items:", err);
        setMenuItems([]);
        setMenuLoading(false);
      });
  }, []);

  if (loading) {
    return 'Loading user info...';
  }

  if (!data?.email) {
    return 'You must be logged in to view this page.';
  }

  if (!data?.admin) {
    return 'Not an admin.';
  }
  if (menuLoading) {
    return <div>Loading menu items...</div>;
  }



  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button flex"
          href={'/menu-items/new'}>
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 && menuItems.map(item => (
            <Link
              key={item._id}
              href={'/menu-items/edit/' + item._id}
              className="bg-gray-200 rounded-lg p-4"
            >
              <div className="relative">
                <Image
                  className="rounded-md"
                  src={item.image} alt={''} width={200} height={200} />
              </div>
              <div className="text-center">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}