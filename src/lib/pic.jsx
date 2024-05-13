const albumCover = [
    {
        albumName: "Taylor Swift",
        url:"https://images.genius.com/be8b30abcf286f1bf996e82e7e96dc14.1000x1000x1.jpg",
    },
    {
        albumName: "Fearless",
        url:"https://images.genius.com/4106504d887d1e6c46f11b1da318dba7.1000x1000x1.jpg",
    },
    {
        albumName: "Speak Now",
        url:"https://images.genius.com/700d265f97f8faf0a41ecad2f5250431.1000x1000x1.jpg",
    },
    {
        albumName: "Red",
        url:"https://images.genius.com/7809d535eef0145a98d1ef1d5fbe4391.1000x1000x1.jpg",
    },
    {
        albumName: "1989",
        url:"https://images.genius.com/a7c0bb49114dc476947df4375fb2ca0b.1000x1000x1.png",
    },
    {
        albumName: "reputation",
        url:"https://images.genius.com/d6eba083b40fcec8b16ab1b4489fe057.1000x1000x1.png",
    },
    {
        albumName: "Lover",
        url:"https://images.genius.com/960edcb36156c3aed9cb70ede250780a.1000x1000x1.jpg",
    },
    {
        albumName: "folklore",
        url:"https://images.genius.com/4a6a06f7e361703062b0db46d0e4ec36.1000x1000x1.png",
    },
    {
        albumName: "evermore",
        url:"https://images.genius.com/3e354c719fe236ab4a75adc6ea4c7fca.1000x1000x1.png",
    },
    {
        albumName: "Midnights",
        url:"https://images.genius.com/aafab4599e2b126541b114e9952a6774.1000x1000x1.jpg",
    },
    {
        albumName: "THE TORTURED POETS DEPARTMENT",
        url:"https://images.genius.com/060181ac1b325992184cbe693e0318e1.1000x1000x1.png",
    }
];

const singlCover = [
    {songName: "Renegade", url: "https://images.genius.com/213cb7d5d3cf320d5a2127499364defa.1000x1000x1.jpg"},
    {songName: "Beautiful Eyes", url: "https://images.genius.com/d6286ec27200e6d723c36d55fd89b4ca.894x894x1.jpg"},
    {songName: "Crazier", url: "https://images.genius.com/c84f1a84dcdeccfdeee258f3e79c2ad3.600x600x1.jpg"},
    {songName: "I Heart ?", url: "https://images.genius.com/d6286ec27200e6d723c36d55fd89b4ca.894x894x1.jpg"},
    {songName: "I Don't Wanna Live Forever", url: "https://images.genius.com/734ece38e8ab973f353e6c3beaea915a.1000x1000x1.jpg"},
    {songName: "Only The Young", url: "https://images.genius.com/5a49ef559e6b608b7f014c463f4b1e9f.1000x1000x1.jpg"},
    {songName: "Carolina", url: "https://images.genius.com/db60dd4ad88f4a2a63c00cb394202d7c.1000x1000x1.jpg"},
]

export function getCover(albumName, songName) {
    if (typeof(albumName) !== "string" || typeof(songName) !== "string") {
        return null
    }
    
    if (albumName !== "Single") {
        const picLib = albumCover.find( picLibItem => picLibItem.albumName === albumName);
        const albumCoverLink = picLib.url;
        return albumCoverLink;
    } else if (albumName === "Single") {
        const singleCoverLink = singlCover.find( item => item.songName === songName).url;
        return singleCoverLink;
    }
}

