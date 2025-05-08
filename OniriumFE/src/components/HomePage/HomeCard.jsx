import { Link } from "react-router-dom";
import { Card, CardContent } from "../Generic/Cards";

const HomeCard = ({ icon, title,description, listItem = [], linkText,linkHref  }) => {
  return (
    <Card className="border-theme bg-second-background shadow-lg h-full relative">
      <CardContent className="relative p-9 flex flex-col h-full">
        <div className=" mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl text-gold mb-2 uppercase">{title}</h3>
        <p className="text-gray-400 mb-4">
          {description}
        </p>
        {listItem.length > 0 && (
          <ul className="space-y-2 text-gray-300">
            {listItem.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        {linkText && linkHref && (
          <div className="mt-auto pt-4">
            <Link to={linkHref} className="text-white hover:text-gray-400 font-medium">
              {linkText} →
            </Link>
          </div>
        )}
      </CardContent>     

    </Card>
  );
};

export default HomeCard;
