export const calculateTime = (messageTime) => {
    const date = new Date();
    const difference = (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) - messageTime;

    if(difference < 60){
        return "less than minute";
    }else{
        const minute = Math.round(difference / 60);

        if(minute > 60){
            const hours = Math.round(minute / 60);

            if(hours == 1){
                return `${hours} hour ago`;
            }else{
                return `${hours} hours ago`;
            }
        }else{
            return `${minute} minutes ago`;
        }
    }
};