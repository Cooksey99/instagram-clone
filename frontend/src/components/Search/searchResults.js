import { useHistory } from 'react-router-dom'

export default function SearchResults({ results, setFocus }) {

    const history = useHistory();


    return (
        <div className='fullscreen-container'
            onClick={() => {
                setFocus(false)
                console.log('hi')
            }}>
            <section id="search-results">
                {results.length > 0 && results.map(profile => (
                    <div className="single-result"
                        onClick={() => {
                            history.push(`/profile/${profile.id}`);
                            setFocus(false);
                        }}>
                        <img className="search-image"
                            src={profile?.image ? profile?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} />
                        <p>{profile?.username}</p>
                    </div>
                )
                )}
            </section>
        </div>
    )
}
