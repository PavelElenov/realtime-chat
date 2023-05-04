let users = [
    {
        username: "Kaside",
        email: "kaside@gmail.com",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGb8PmEaRgeXshs4ycQC8wyYl8h6RffDbg-A&usqp=CAU",
        password: "1234" 
    },
    {
        username: "By-the-way",
        email: "bytheway@gmail.com",
        img: "https://marketplace.canva.com/EAFEits4-uw/1/0/800w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-r0bPCSjUqg0.jpg",
        password: "1234" 
    },
    {
        username: "Rikotejko",
        email: "rikotejko@gmail.com",
        img: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
        password: "1234" 
    },
    {
        username: "special82",
        email: "special82@gmail.com",
        img: "https://wallpapers.com/images/featured/87h46gcobjl5e4xu.jpg",
        password: "1234" 
    },
    {
        username: "Belotaroo",
        email: "belotaroo@gmail.com",
        img: "https://www.goodmorningimagesdownload.com/wp-content/uploads/2021/12/Free-Insta-Profile-Wallpaper.jpg",
        password: "1234" 
    }
];


const getAllUsers = () => {
    let arr = [];

    for(let user of users){
        arr.push({username: user.username, img: user.img})
    };

    return arr;
};

const getUserByUsername = (username) => {
    const user = users.find(user => user.username == username);
    return {username: user.username, img: user.img};
} 

const login = (email, password) => {
    const user = users.find(user => user.email == email);

    if(!user || user.password !== password){
        throw new Error("Incorrect email or password");
    }

    return {username:user.username, img: user.img};
}

module.exports = {
    getAllUsers,
    login,
    getUserByUsername
}