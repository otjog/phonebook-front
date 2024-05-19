const useUserAuth = () => {
    let userRegistered = useCookie('user_registered');
    let userVerified = useCookie('user_verified');

    const setUserRegistered = (value) => {
        userRegistered.value = value
    }

    const setUserVerified = (value) => {
        userVerified.value = value
    }
    return {
        userRegistered,
        userVerified,
        setUserRegistered,
        setUserVerified,
    }
}
export default useUserAuth