import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSelectedClassDetails, updateCharacterInfo } from "../../redux/slices/selectionSlice";
import ClassDialogSelection from "./ClassDialogSelection";
import { getData } from "../../api";

const ClassAssignments = () => {
  const dispatch = useDispatch();
  const character = useSelector((state) => state.selection);
  const data = useSelector((state) => state.data);

  const [subclassDialogOpen, setSubclassDialogOpen] = useState(false);
  const [activeClassForSubclass, setActiveClassForSubclass] = useState(null);

  const classAssignments = character.classAssignments || [];

  const increaseLevel = (classId, current) => {
    const updated = classAssignments.map((cls) =>
      cls.id === classId
        ? { ...cls, levelinClass: current + 1 }
        : cls
    );
    dispatch(updateCharacterInfo({ classAssignments: updated }));
  };

  const decreaseLevel = (classId, current) => {
    let updated;
  
    if (current === 1) {
      updated = classAssignments.filter((cls) => cls.id !== classId);
    } else {
      updated = classAssignments.map((cls) =>
        cls.id === classId
          ? { ...cls, levelinClass: current - 1 }
          : cls
      );
    }
  
    dispatch(updateCharacterInfo({ classAssignments: updated }));
  };

  const handleSubclassSelect = (classId) => {
    setActiveClassForSubclass(classId);
    setSubclassDialogOpen(true);
  };

  const saveSubclass = (subclassId) => {
    const updated = classAssignments.map((cls) =>
      cls.id === activeClassForSubclass
        ? { ...cls, subclass: subclassId }
        : cls
    );
    dispatch(updateCharacterInfo({ classAssignments: updated }));
    setSubclassDialogOpen(false);
    setActiveClassForSubclass(null);
  };

  useEffect(() => {
    const fetchClassDetails = async () => {
      if (classAssignments.length === 0) return;
  
      const classIds = classAssignments.map((cls) => cls.id);
      const subclassIds = classAssignments
        .map((cls) => cls.subclass)
        .filter(Boolean);
  
      const result = await getData("selectedClasses", null, {
        classIds,
        subclassIds
      });
  
      if (result?.data) {
        const sorted = classAssignments
        .map((cls) => result.data.find((r) => r.id === cls.id))
        .filter(Boolean);  
        dispatch(setSelectedClassDetails(sorted));
      }
    };
  
    fetchClassDetails();
  }, [classAssignments, dispatch]);


  return (
    <>
      {classAssignments.length > 0 && (
        <div className="space-y-6">
          {classAssignments.map((cls) => {
            const classData = data.class.find((c) => c.id === cls.id);
            const canSelectSubclass =
              classData?.requiredLevelForSubclass &&
              cls.levelinClass >= classData.requiredLevelForSubclass &&
              classData?.subclasses?.length > 0;

            const subclassName =
              classData?.subclasses?.find((s) => s.id === cls.subclass)?.name;

            return (
              <div key={cls.id} className="text-white border-b-gold">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-gold font-semibold">
                    {classData?.name} - {cls.subclass && (
                    <span className="font-normal ">{subclassName}</span>                
                )} 
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="px-2 py-1 text-white hover:text-gold cursor-pointer"
                      onClick={() =>
                        decreaseLevel(cls.id, cls.levelinClass)
                      }
                    >
                      −
                    </button>
                    <span>livello {cls.levelinClass}</span>
                    <button
                      type="button"
                      className="px-2 py-1 text-white hover:text-gold cursor-pointer"
                      onClick={() =>
                        increaseLevel(cls.id, cls.levelinClass)
                      }
                    >
                      +
                    </button>
                  </div>
                  {canSelectSubclass && !cls.subclass && (
                  <button
                    type="button"
                    onClick={() => handleSubclassSelect(cls.id)}
                    className="flex items-center justify-between mt-2 h-7 rounded-md bg-second-background px-3 py-2 text-sm hover:text-gold cursor-pointer"
                
                  >
                    Scegli una sottoclasse
                  </button>
                )}
                </div>                             
              </div>
            );
          })}
        </div>
      )}

      {/* Dialogo selezione sottoclasse */}
      {activeClassForSubclass && (
        <ClassDialogSelection
          title="Scegli una sottoclasse"
          options={
            data.class.find((cls) => cls.id === activeClassForSubclass)
              ?.subclasses || []
          }
          open={subclassDialogOpen}
          onOpenChange={setSubclassDialogOpen}
          onSelect={saveSubclass}
        />
      )}
    </>
  );
};

export default ClassAssignments;
