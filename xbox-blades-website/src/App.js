import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import styled from "styled-components";

// Blade container for layout
const Dashboard = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom, #f4e0ac, #e2d3a8); /* Warm color palette */
  overflow: hidden;
`;

// Sidebar for blades menu
const Sidebar = styled.div`
  width: 10%;
  background: #d9d9d9;
  border-right: 4px solid #b3b3b3;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SidebarItem = styled.li`
  margin: 15px 0;
  padding: 15px;
  background-color: ${(props) => (props.active ? "#c6a962" : "#e2e2e2")};
  border: 2px solid #bfa963;
  text-align: center;
  cursor: pointer;
  list-style: none;
  border-radius: 10px;
  &:hover {
    background-color: #c8a962;
  }
`;

// Blade Content
const Blade = styled.div`
  width: 90%;
  position: absolute;
  background-color: #f5f5f5;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 0 20px 20px 0;
  padding: 20px;
  transition: all 0.5s ease;
  transform: translateX(100%);
  &.active {
    transform: translateX(0);
  }
`;

const bladesData = [
  { id: "home", title: "Home", content: "Welcome to Blake's Xbox Blades Website" },
  { id: "about", title: "About", content: "About Blake and his work" },
  { id: "projects", title: "Projects", content: "Showcase of my projects" },
  { id: "contact", title: "Contact", content: "Contact Blake" },
];

function App() {
  const [activeBlade, setActiveBlade] = useState("home");
  const bladesRef = useRef([]);

  useEffect(() => {
    const activeIndex = bladesData.findIndex((blade) => blade.id === activeBlade);
    gsap.to(bladesRef.current[activeIndex], { x: 0, duration: 0.5, ease: "power3.inOut" });
    bladesRef.current.forEach((blade, i) => {
      if (i !== activeIndex) {
        gsap.to(blade, { x: "100%", duration: 0.5, ease: "power3.inOut" });
      }
    });
  }, [activeBlade]);

  return (
    <Dashboard>
      {/* Sidebar Menu */}
      <Sidebar>
        <ul>
          {bladesData.map((blade) => (
            <SidebarItem
              key={blade.id}
              active={activeBlade === blade.id}
              onClick={() => setActiveBlade(blade.id)}
            >
              {blade.title}
            </SidebarItem>
          ))}
        </ul>
      </Sidebar>

      {/* Blade Sections */}
      {bladesData.map((blade, index) => (
        <Blade
          key={blade.id}
          ref={(el) => (bladesRef.current[index] = el)}
          className={activeBlade === blade.id ? "active" : ""}
        >
          <h2>{blade.title}</h2>
          <p>{blade.content}</p>
        </Blade>
      ))}
    </Dashboard>
  );
}

export default App;
