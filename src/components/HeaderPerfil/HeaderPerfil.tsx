import SearchBar from "../SearchBar/SearchBar"

export default function HeaderPerfil() {
    return (
    <header className= "absolute top-4 right-4 flex items-center gap-25">
        <SearchBar />
        <img
            src="/person-circle.svg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            />
    </header>
    )
}