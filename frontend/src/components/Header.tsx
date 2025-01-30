import { Menu } from "antd";

function Header() {
  return (
    <header className="shadow-md bg-white">
<Menu
  mode="horizontal"
  className="flex justify-between bg-white shadow-sm"
  items={[
    { label: <span className="hover:text-indigo-500">Home</span>, key: "/" },
    { label: <span className="hover:text-indigo-500">Metrics</span>, key: "/metrics" },
    { label: <span className="hover:text-indigo-500">Chatbot</span>, key: "/chatbot" },
  ]}
/>
    </header>
  );
}

export default Header;
