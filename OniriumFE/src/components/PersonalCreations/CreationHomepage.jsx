import { CardHeader } from "../Generic/Cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Generic/Tabs";
import { useState } from "react";
import MyCharactersPage from "./MyCharactersPage";

const CreationHomepage = () => {
  const [activeTab, setActiveTab] = useState("characters");
  const tabs = [
    {
      value: "characters",
      label: "Personaggi",
      //icon: UserIcon,
    },
    {
      value: "spells",
      label: "Incantesimi",
      //icon: PersonGear,
    },
    {
      value: "items",
      label: "Oggetti",
      //icon: BookOpenIcon,
    },
  ];

  return (
    <>
      <div className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/11/dnd-castle-on-a-cliff.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-wider text-gold fade-up">
            LE TUE CREAZIONI
          </h1>
          <p className="max-w-2xl text-gray-300 fade-up">
            Crea, gestisci e condividi le tue creazioni con la community
          </p>
        </div>
      </div>
      <div className="container-fluid mx-auto py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="relative">
            <div className=" border-gold/40 border grid grid-cols-3  p-1 rounded-sm">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative group pb-2 rounded-sm hover:text-gray-300 transition-colors duration-300 data-[state=active]:text-gold data-[state=active]:bg-second-background"
                >
                  <div className="flex items-center justify-center">
                    {/* <tab.icon className="h-4 w-4 mr-2" /> */}
                    <span className="hidden lg:inline uppercase">
                      {tab.label}
                    </span>
                  </div>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>

          <MyCharactersPage />
          <TabsContent
            value="spells"
            className="h-[70vh] flex justify-center items-center"
          >
            <h1 className="text-gold text-5xl">IN ARRIVO...</h1>
          </TabsContent>
          <TabsContent value="items" className="h-[70vh] flex justify-center items-center">
          <h1 className="text-gold text-5xl">IN ARRIVO...</h1>
          {/* <OniriumLoader size="lg" /> */}
          </TabsContent>
        </Tabs>

        
      </div>
    </>
  );
};

export default CreationHomepage;
