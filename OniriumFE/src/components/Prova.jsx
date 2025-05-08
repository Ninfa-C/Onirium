import { useEffect, useState } from "react";
import { getClasses, getSpells } from "../api";
import { Distance } from "../assets/icons/action";
import { Acido, Contundenti, Forza, Freddo, Fulmine, Fuoco, Necro, Perforanti, Psi, Radiante, Taglienti, Tuono, Veleno } from "../assets/icons/dmgType";

function Prova () {
    const [spells, setSpells] = useState([]);
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState(null);
    //const [loading, setLoading] = useState(true);

        const loadSpells = async () => {
          try {
            const data = await getSpells();
            if (!data || data.length === 0) { 
              //setError("Nessun incantesimo disponibile.");
              return;
            }
            setSpells(data); 
          } catch (err) {
            setError(err.message);
          } finally {
            //setLoading(false);
          }
        };
        const loadClasses = async () => {
          try {
            const data = await getClasses();
            if (!data || data.length === 0) { 
              setError("Nessun incantesimo disponibile.");
              return;
            }
            setClasses(data); 
          } catch (err) {
            setError(err.message);
          } finally {
            //setLoading(false);
          }
        };


    useEffect(() => {
        loadSpells();
        loadClasses();
      }, []);


      //if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

    return (  
        <div className="w-11/12 mx-auto">
            
            <h1 className="text-white mb-3 text-3xl">incantesimi Prova</h1>
            <div className="flex gap-2 items-center">
              <Acido className="text-cyan-500 w-10"/>             
              <Distance className="text-cyan-500 w-10"/>
              <Contundenti className="text-cyan-500 h-10 rotate-45"/>
              <Forza className="text-cyan-500 w-10"/>
              <Freddo className="text-cyan-500 w-10"/>
              <Fulmine className="text-cyan-500 h-10"/>
              <Fuoco className="text-cyan-500 h-10"/>
              <Necro className="text-cyan-500 w-10"/>
              <Perforanti className="text-cyan-500 h-10 rotate-45"/>
              <Psi className="text-cyan-500 w-10"/>
              <Radiante className="text-cyan-500 w-10"/>
              <Taglienti className="text-cyan-500 h-10 rotate-45"/>
              <Tuono className="text-cyan-500 w-10"/>
              <Veleno className="text-cyan-500 h-10"/>
            </div>
            {console.log(classes)}
          {classes.length >0 && classes.map((item) =>{
           return <>
           <div className="flex items-center" key={item.id}>
            {item.image && (
              <img 
                src={`http://localhost:5034/${item.image.replace(/\\/g, '/')}`}
                alt={item.name} 
                className="spell-image"
                width={100}
              />
            )}
            {item.image && (
              <img 
                src={`http://localhost:5034/${item.imageSemplifier.replace(/\\/g, '/')}`}
                alt={item.name} 
                className="spell-image"
                width={60}
              />
            )}
             <h2 className="text-white" >{item.name}: {item.description}</h2>
             </div>
             {item.subclasses.length>0 && item.subclasses.map((e)=>(
              <>
              <p key={e.id} className="text-white">
                {e.name}
              </p>
              </>
             ))};
            </>
          })}
            
            {spells.length >0 && spells.map((spell) => (
          <div key={spell.id} className="spell-card text-white mb-3">
            {spell.image && (
              <img 
                src={`http://localhost:5034/${spell.image.replace(/\\/g, '/')}`}
                alt={spell.name} 
                className="spell-image"
              />
            )}
            
            <div className="spell-header">
              <h2>{spell.name}</h2>
              <span className="spell-level">Level {spell.level}</span>
            </div>

            <div className="spell-school">{spell.school}</div>

            <div className="spell-meta">
              <p>Casting Time: {spell.cost}</p>
              <p>Range: {spell.range}</p>
              <p>Duration:{spell.isConcentration && <>Concentrazione, fino a</>} {spell.duration}</p>
            </div>

            <div className="spell-description">
              <p>{spell.description}</p>
              {spell.extraDescription && <p>{spell.extraDescription}</p>}
            </div>

            {spell.damage && spell.damage.length > 0 && (
              <div className="spell-damage">
                <h4>Damage:</h4>
                <ul>
                  {spell.damage.map((dmg, index) => (
                    <li key={index}>
                      {dmg.damageDice} {dmg.damageType} damage
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="spell-footer">
              
              {spell.isRitual && <span className="tag">Ritual</span>}
              {spell.savingThrow && <span className="tag">Save: {spell.savingThrow}</span>}
            </div>
          </div>
        ))} 
        </div>
        
    );
} 
export default Prova;