import useLocalStorageState from "use-local-storage-state";

export default function useLogoutEvent(){

  const [logoutEvent, setLogoutEvent] = useLocalStorageState<boolean | undefined>('logoutEvent', {
          defaultValue: undefined,
          storageSync: true
      })

      return {
        logoutEvent,
        setLogoutEvent
      }
}