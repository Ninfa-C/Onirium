const CharHeader = ({title, description, children}) => {
    return (   <div>
        <h3 className="text-xl text-gold uppercase font-extralight tracking-wide mb-2">
          {title}
        </h3>
        <p className="mb-6 opacity-75">
          {description}
        </p>
        {children}
      </div> );
}
 
export default CharHeader;