import {useEffect,useState} from 'react';
export default function useOutsideAlerter(ref:any) {
  const [clickedOutSide,setClickOutSide] = useState(false);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event:MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setClickOutSide(true);
      }else{
        setClickOutSide(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  
  return [clickedOutSide,setClickOutSide];
}