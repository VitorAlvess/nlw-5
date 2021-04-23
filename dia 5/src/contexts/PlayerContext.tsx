import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;

}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;


    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPLayinState:(state:boolean) => void;
    togglePlay: () => void;
    toggleShuffle: () => void;

    toggleLoop: () => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPLayerState: () => void;

    hasPrevious: boolean;
    hasNext: boolean;

}
export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode; 
}
export function PlayerContextProvider({ children } : PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIslooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)



  
    function play(episode){
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0)
      setIsPlaying(true)
    }
  
    function playList(list: Episode[], index: number){
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }



    function togglePlay() {
      setIsPlaying(!isPlaying)
    }
    function toggleLoop() {
        setIslooping(!isLooping)
      }
    function toggleShuffle() {
        setIsShuffling(!isShuffling)
      }
    
  
    function setPLayinState(state: boolean){
      setIsPlaying(state)
    }

    function clearPLayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0)
    }



    const  hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
    function playNext(){

        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

            
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        }else if (hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
        
    }

    function playPrevious(){
        if (hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }
  
  
    return (
  
        <PlayerContext.Provider value={{ 
            episodeList,
            currentEpisodeIndex,
            play,
            isPlaying,
            playList,
            playPrevious,
            playNext,
            togglePlay,
            hasNext,
            hasPrevious,
            toggleLoop,
            isLooping,
            isShuffling,
            toggleShuffle,
            clearPLayerState,   
            setPLayinState}}>
            {children}


        </PlayerContext.Provider>
        )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}
