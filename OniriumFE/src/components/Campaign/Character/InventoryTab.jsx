import { useDispatch, useSelector } from "react-redux";
import { TabsContent } from "../../Generic/Tabs";
import { Button } from "../../Generic/ButtonCustom";
import {
  getCharacterAssign,
  getUpdatedInventoryCategory,
  getUpdatedInventoryItems,
} from "../../../redux/slices/characterDetailsSlice";
import { useEffect, useState } from "react";
import { Taglienti } from "../../../assets/icons/dmgType";
import { Armor, MagicItem } from "../../../assets/icons/generic";
import { Backpack, Plus, Shield, Trash3 } from "react-bootstrap-icons";
import UpdateModal from "./UpdateModal";
import { updateItemOrSpell } from "../../../api/CampaignApi";
import { LineDecoration } from "../../../assets/decoration";

const InventoryTab = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const { characterAssign, error } = useSelector(
    (state) => state.characterDetails
  );
  const inventoryUpdated = characterAssign?.isInventoryUpdated;
  const weapons = useSelector((state) => state.characterDetails.weapons);
  const armor = useSelector((state) => state.characterDetails.armor);
  const magicItems = useSelector((state) => state.characterDetails.magicItems);
  const commonItems = useSelector(
    (state) => state.characterDetails.commonItems
  );

  const handleEquipArmor = async (item) => {
    const equippedArmor = armor.find(
      (item) => item.isEquiped
    );

    if (equippedArmor) {
      const request = {
        ItemId: equippedArmor.id,
        Quantity: 1,
        IsEquiped: false,
      };
      await updateItemOrSpell(characterAssign.character.id, request);
    }

    if (!equippedArmor || equippedArmor.id != item.id) {
      const request = {
        ItemId: item.id,
        Quantity: 1,
        IsEquiped: !item.isEquiped,
      };
      await updateItemOrSpell(characterAssign.character.id, request);
    }
    dispatch(getCharacterAssign(characterAssign.id));
  };

  const handleRemove = async (item) => {
    const request = {
      ItemId: item.id,
      Quantity: 0,
      IsEquiped: item.isEquiped,
    };
  
    try {
      await updateItemOrSpell(characterAssign.character.id, request);
      const result = await dispatch(getCharacterAssign(characterAssign.id)).unwrap();
      const updatedCharacterAssign = result;
      const itemDetails = updatedCharacterAssign.character.inventory.find(
        (invItem) => invItem.id === item.id
      );
      const category = itemDetails?.item?.itemCategory;
      if (category) {
        dispatch(
          getUpdatedInventoryCategory({
            characterAssign: updatedCharacterAssign,
            category,
          })
        );
      }
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };
  
  
  useEffect(() => {
    if (characterAssign && !inventoryUpdated) {
      dispatch(getUpdatedInventoryItems(characterAssign));
    }
  }, [dispatch, characterAssign, inventoryUpdated]);

  if (error) return <div>Error: {error}</div>;

  return (
    <TabsContent value="items" className="p-6 space-y-6">
      <div className="flex items-center ">
        <LineDecoration className="flex-grow h-1 mr-5 scale-x-[-1] " />
        <h4 className="text font-serif text-gold whitespace-nowrap uppercase text-xl">
          equipaggiamento e inventario
        </h4>
        <LineDecoration className="flex-grow h-1 ml-5 " />
      </div>
      {/* armi */}
      <div>
        <div className="flex justify-between mb-3 items-center">
          <h3 className="flex items-center text-gold  font-medium">
            <Taglienti className="h-4 w-4 mr-2 rotate-45" /> Armi
          </h3>
          <Button
            className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border h-8"
            onClick={() => {
              setModalOpen(true), setCategory("arma");
            }}
          >
            <Plus className="h-4 w-4" /> Aggiungi Arma
          </Button>
        </div>
        {weapons.map((item, i) => (
          <div
            className="p-3 bg-gold/5 rounded-md border border-gold/10 mb-5"
            key={i}
          >
            <div className="flex justify-between">
              <h4 className="font-medium text-gold">{item.item?.name}</h4>
              {item.isMagic ? (
                <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                  Magico
                </span>
              ) : (
                <span className="text-xs bg-black/40 text-gray-400 px-2 py-1 rounded">
                  Normale
                </span>
              )}
            </div>
            {item.item.damages.map((damage, i) => (
              <div className="grid grid-cols-3 gap-2 mt-2 text-sm" key={i}>
                <div>
                  <span className="text-gray-400">Danni:</span>
                  <span className="text-white"> {damage.damageDice}</span>
                </div>
                <div>
                  <span className="text-gray-400">Tipo:</span>
                  <span className="text-white capitalize">
                    {" "}
                    {damage.damageType}{" "}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <p className="text-xs text-gray-300 mt-2">
                {item.item?.description}
              </p>
              <Button onClick={() => handleRemove(item)}>
                <Trash3 />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* armatura */}
      <div>
        <div className="flex justify-between mb-3 items-center">
          <h3 className="flex items-center text-gold text-sm font-medium">
            <Armor className="h-4 w-4 mr-2" /> Armatura
          </h3>
          <Button
            className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border h-8"
            onClick={() => {
              setModalOpen(true), setCategory("armatura");
            }}
          >
            Gestisci Armatura
          </Button>
        </div>
        {armor.map((item, i) => (
          <div
            className="p-3 bg-gold/5 rounded-md border border-gold/10 mb-5"
            key={i}
          >
            <div className="flex justify-between">
              <h4 className="font-medium text-gold">{item.item?.name}</h4>
              <div className="flex gap-2">
                {item.item?.isMagic ? (
                  <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                    Magico
                  </span>
                ) : (
                  <span className="text-xs bg-black/40 text-gray-400 px-2 py-1 rounded">
                    Normale
                  </span>
                )}
                {item.isEquiped ? (
                  <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                    Equipaggiato
                  </span>
                ) : (
                  <span className="text-xs bg-black/40 text-gray-400 px-2 py-1 rounded">
                    Non equipaggiato
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
              <div>
                <span className="text-gray-400">CA Base:</span>
                <span className="text-white"> {item.item?.armorClass}</span>
              </div>
              <div>
                <span className="text-gray-400">Tipo:</span>
                <span className="text-white"> {item.item?.armorType}</span>
              </div>
              {item.item?.requirements.length > 0 && (
                <div>
                  <span className="text-gray-400">Requisito:</span>
                  <span className="text-white">
                    {" "}
                    {item.item?.requirements[0].statName
                      .slice(0, 3)
                      .toUpperCase()}{" "}
                    {item.item?.requirements[0].minimumValue}
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-300 mt-2">
                {item.item?.description}
              </p>
              <div>
                <Button onClick={() => handleRemove(item)}>
                  <Trash3 />
                </Button>
                {
                  <Button onClick={() => handleEquipArmor(item)}>
                    <Shield />
                  </Button>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ogg magici */}
      <div className="mt-6">
        <div className="flex justify-between mb-3 items-center">
          <h3 className="flex items-center text-gold text-sm font-medium mb-2">
            <MagicItem className="h-4 w-4 mr-2" /> Oggetti Magici
          </h3>
          <Button
            className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border h-8"
            onClick={() => {
              setModalOpen(true), setCategory("magic");
            }}
          >
            Gestisci Ooggetti Magici
          </Button>
        </div>
        <div className="space-y-3">
          {magicItems.map((item, i) => (
            <div
              key={i}
              className="p-3 bg-gold/5 rounded-md border border-gold/10"
            >
              <h4 className="font-medium text-gold">{item.item?.name}</h4>
              <p className="text-xs text-gray-300 mt-1">
                {item.item?.description || "Nessuna descrizione disponibile."}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* ogg comuni */}
      <div className="mt-6">
        <div className="flex justify-between mb-3 items-center">
          <h3 className="flex items-center text-gold text-sm font-medium mb-2">
            <Backpack className="h-4 w-4 mr-2" /> Inventario
          </h3>
          <Button
            className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border h-8"
            onClick={() => {
              setModalOpen(true), setCategory("common");
            }}
          >
            Gestisci Inventario
          </Button>
        </div>

        <div className="p-3 bg-gold/5 rounded-md border border-gold/10 grid grid-cols-2 gap-x-5">
          {commonItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gold/10 text-gray-300 items-center h-8"
            >
              <p>
                • {item.item?.name}
                {item.quantity > 1 ? ` ( ${item.quantity} )` : ""}
              </p>
              <Button onClick={() => handleRemove(item)}>
                <Trash3 />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <UpdateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        character={characterAssign}
        category={category}
      />
    </TabsContent>
  );
};

export default InventoryTab;
