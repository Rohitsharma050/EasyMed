export default function HomeNavbar()
{
    return(
       <>
       <div className="flex justify-between items-center p-4 shadow-md fixed top-0 left-0 w-full bg-white z-50 opacity-90">
        <div>
            <h1 className="text-3xl font-bold text-blue-500">EasyMed</h1>
        </div>
        <div >
            <ul className="flex gap-8 font-semibold">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">About</li>
                <li className="cursor-pointer">Services</li>
                <li className="cursor-pointer">Contact</li>
            </ul>
        </div>
        <div>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                SignUp
            </button>
        </div>
       </div>
       </>
    );
}