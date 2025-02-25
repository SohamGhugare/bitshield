interface UserTypeCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export const UserTypeCard = ({ title, description, buttonText, onClick }: UserTypeCardProps) => (
  <div 
    className="h-full flex flex-col bg-white p-10 rounded-2xl border border-gray-200 hover:border-bitcoin cursor-pointer shadow-lg hover:shadow-xl transition-all text-center group"
    onClick={onClick}
  >
    <h2 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-bitcoin transition-colors">{title}</h2>
    <p className="text-gray-600 text-lg mb-8 flex-grow">{description}</p>
    <div className="flex justify-center">
      <button className="bg-bitcoin hover:bg-bitcoin-hover text-white px-8 py-4 rounded-xl font-medium transition-all transform group-hover:scale-105 text-lg w-full sm:w-auto">
        {buttonText}
      </button>
    </div>
  </div>
); 