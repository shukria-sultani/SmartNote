
import noteIcon from  "../assets/images/about.jpg"
export default function UserProfile(){

    return (
        <div className="w-full">
            <div className="flex flex-col justify-center items-center w-full p-2">
                <img src={`${noteIcon}`} alt="Profile picture"  className="w-20 h-20 rounded-full"  />
                   <span className="pt-3">Shukria</span>
            </div>
         
        </div>
    )

}