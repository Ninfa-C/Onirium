/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  ExclamationTriangle,
  FileText,
  Gear,
  Map,
  Pencil,
  People,
  Plus,
  X,
} from "react-bootstrap-icons";
import { Card, CardContent } from "../Generic/Cards";
import { Master, Scroll } from "../../assets/icons/generic";
import { BookOpenIcon, UsersIcon } from "@heroicons/react/16/solid";
import { Button } from "../Generic/ButtonCustom";


  const DetailAside = ({ campaign, sessions, setActiveSection, characters,setSelectedCharacterId }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);  

  const now = new Date();
  const nextSession = sessions
    .filter((session) => new Date(session.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const menuItems = [
    { name: "Panoramica", value: "overview", icon: BookOpenIcon },
    {
      name: "Campagna",
      value: "campaign",
      icon: Calendar,
      children: [
        { name: "Giocatori", value: "players", icon: People },
        { name: "Sessioni", value: "sessions", icon: Calendar },
        { name: "Luoghi", value: "locations", icon: Map },
        // { name: "NPC", value: "npcs", icon: UsersIcon },
        { name: "Missioni", value: "quests", icon: Scroll },
        { name: "Note", value: "notes", icon: FileText },
      ],
    },
    ...(campaign.role === "master"
      ? [{ name: "Impostazioni", value: "settings", icon: Gear }]
      : []),
    ...(campaign.role === "Player"
      ? [
          {
            name: "Personaggi",
            value: "characters",
            icon: Gear,
            children: characters?.map((char, index) => ({
              name: char.name,
              value: char.assigngId,
              icon: Pencil,
            })),
          },
        ]
      : []),
  ];

  const isGuid = (value) => {
    const guidPattern = /^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/;
    return guidPattern.test(value);
  };
  

  const handleMenuItemClick = (value) => {
    setMobileMenuOpen(false);
    setActiveSection(value);
    document.getElementById(value)?.scrollIntoView({ behavior: "smooth" });
    if (isGuid(value)) {
      setSelectedCharacterId(value);
    }else{
      setSelectedCharacterId(null)
    }
  };
  return (
    <aside className="h-max sticky top-20 bg-second-background border border-gold/30 rounded-lg p-6 space-y-6 hidden lg:block">

      {/* Next session */}
      {nextSession && (
        <div>
          <h3 className="text-gold font-medium mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-2" /> Prossima Sessione
          </h3>
          <Card className="bg-gold/10 border-gold/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <p className="text-gold font-medium">{nextSession.title}</p>
              </div>
              <div className="flex items-center text-gray-300 mt-1 text-xs gap-2">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                  {new Date(nextSession.date).toLocaleDateString("it-IT", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>{nextSession.date.split("T")[1].substring(0, 5)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <nav>
        <h3 className="text-gold font-medium mb-2">Navigazione</h3>
        <ul className="space-y-1">
          {menuItems.map(({ name, value, icon: Icon, children }) => (
            <li key={value}>
              <Button
                className="w-full justify-start text-gray-300 hover:text-gold hover:bg-gold/10"
                onClick={() => {handleMenuItemClick(value), setSelectedCharacterId(null)}}
              >
                <Icon className="h-4 w-4 mr-2" />
                {name}
              </Button>

              {children && (
                <ul className="pl-6 space-y-1">
                  {children.map(({ name: childName, value: childValue, icon: ChildIcon }) => (
                    <li key={childValue}>
                      <Button
                        className="w-full justify-start text-gray-400 hover:text-gold hover:bg-gold/5"
                        onClick={() => handleMenuItemClick(childValue)}
                      >
                        <ChildIcon className="h-4 w-4 mr-2" />
                        {childName}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DetailAside;
