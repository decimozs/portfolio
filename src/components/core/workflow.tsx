import React from "react";

export default function Workflow() {
  return (
    <>
      <p>Workflow</p>

      <div className="text-accent">
        <div className="flex flex-row items-center gap-2">
          <p>Linux</p>
          <p>—</p>
          <p>WSL Ubuntu</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p>Terminal</p>
          <p>—</p>
          <p>Powershell</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p>Zsh</p>
          <p>—</p>
          <p>Shell</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p>Neovim</p>
          <p>—</p>
          <p>Text Editor & Code Editor</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p>Obsidian</p>
          <p>—</p>
          <p>Note-Taking</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p>Docker</p>
          <p>—</p>
          <p>Containerization </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p>Figma</p>
          <p>—</p>
          <p>Design & Prototyping</p>
        </div>
      </div>
    </>
  );
}
