const backgrounds = [
    { type: 'image', value: 'wallpaper/xp-small.jpg', position: 'center bottom', size: 'cover', timeout: 10 }, // 5 minutes
    { type: 'image', value: 'wallpaper/office.jpg', position: 'center bottom', size: 'cover', timeout: 10 }, // 5 minutes
    // 	{ type: 'color', value: '#ffffff', timeout: 30 }, // 1 minute,
    { type: 'image', value: 'wallpaper/bess.jpg', position: 'center center', size: 'cover', timeout: 10 }, // 5 minutes
    //	{ type: 'image', value: 'wallpaper/dog_01.jpg', timeout: 10 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/dog_02.jpg', timeout: 15 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/penquin_1.jpg', timeout: 10 }, // 3 minutes
    { type: 'image', value: 'wallpaper/penquin_1.jpg', position: 'center center', size: 'cover', timeout: 10 }, // 3 minutes keep
//    { type: 'image', value: 'wallpaper/dog_02.jpg', position: 'center center', size: 'cover', timeout: 10 }, // 5 minutes
//    { type: 'image', value: 'wallpaper/panda_01.jpg', position: 'center center', size: 'cover', timeout: 15 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/panda_02.jpg', timeout: 10 }, // 3 minutes
//    { type: 'image', value: 'wallpaper/panda_03.jpg', position: 'center center', size: 'cover', timeout: 10 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/panda_03.jpg', timeout: 10 }, // 3 minutes
    //	{ type: 'color', value: '#0533DD', timeout: 10 }, // 1 minute, blue
    // { type: 'image', value: 'image/milkyway.jpg', timeout: 300 }, // 5 minutes (commented out as in your code)
    //	{ type: 'image', value: 'wallpaper/fish_01.jpg', timeout: 10 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/fish_03.jpg', timeout: 10 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/fish_02.jpg', timeout: 10 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/fish_04.jpg', timeout: 10 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/panda_2.jpg', timeout: 10 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/panda_2.jpg', timeout: 10 }, // 3 minutes
//    { type: 'image', value: 'wallpaper/dolphin_2.jpg', position: 'center center', size: 'contain', timeout: 10 }, // 3 minutes keep
//    { type: 'image', value: 'wallpaper/dolphin_1.jpg', position: 'center center', size: 'cover', timeout: 10 }, // 3 minutes keep
    //	{ type: 'image', value: 'wallpaper/dolphin_3.jpg', timeout: 4 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/dolphin_4.jpg', timeout: 4 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/ocean_1.jpg', timeout: 4 }, // 3 minutes
    { type: 'image', value: 'wallpaper/ocean_3.jpg', position: 'center bottom', size: 'cover', timeout: 10 }, // 3 minutes keep
    { type: 'image', value: 'wallpaper/ocean_7.jpg', position: 'center center', size: 'cover', timeout: 15 }, // 3 minutes
//    { type: 'image', value: 'wallpaper/ocean_2.jpg', position: 'center center', size: 'cover', timeout: 10 }, // 3 minutes keep
    //	{ type: 'image', value: 'wallpaper/ocean_4.jpg', timeout: 15 }, // 3 minutes keep
    //	{ type: 'image', value: 'wallpaper/ocean_5.jpg', timeout: 4 }, // 3 minutes
    //	{ type: 'image', value: 'wallpaper/ocean_6.jpg', timeout: 4 }, // 3 minutes
    //  { type: 'image', value: 'wallpaper/lake_4.jpg', timeout: 5 }, // 5 minutes
    //  { type: 'image', value: 'wallpaper/lake_1.jpg', timeout: 15 }, // 4 minutes
    //  { type: 'image', value: 'wallpaper/lake_2.jpg', timeout: 15 }, // 4 minutes
    //  { type: 'image', value: 'wallpaper/lake_3.jpg', timeout: 10 }, // 4 minutes
    //	{ type: 'image', value: 'wallpaper/dalia.jpg', timeout: 10 }, // 3 minutes
    //  { type: 'image', value: 'wallpaper/moon_sky.jpg', timeout: 5 }, // 3 minutes
    //  { type: 'image', value: 'wallpaper/halfmoon.jpg', timeout: 5 }, // 2 minutes
    //  { type: 'image', value: 'wallpaper/moon.jpg', timeout: 5 }, // 2 minutes
    //  { type: 'image', value: 'wallpaper/meteor.jpg', timeout: 2 }, // 2 minutes
    //  { type: 'image', value: 'wallpaper/earth.jpg', timeout: 4 }, // 5 minutes
    //  { type: 'color', value: '#000000', timeout: 4 }, // 1 minute
    { type: 'color', value: '#159A2A', timeout: 5 }, // 1 minute green
    //  { type: 'color', value: '#B57EDC', timeout: 4 }, // 1 minute
    //  { type: 'color', value: '#967BB6', timeout: 4 }, // 1 minute
    //  { type: 'color', value: '#f9f9f9', timeout: 4 }, // 1 minute
    //	{ type: 'color', value: '#121212', timeout: 10 } // 1 minute
//    { type: 'color', value: '#5a5aDD', timeout: 10 }, // 1 minute, blue
    { type: 'color', value: '#ffffff', timeout: 3 } // 1 minute
];

let currentBackgroundIndex = 0;

function changeBackground() {
    const current = backgrounds[currentBackgroundIndex];
    if (current.type === 'image') {
        document.body.style.backgroundImage = `url(${current.value})`;
        document.body.style.backgroundColor = ''; // Clear color if image

        // Apply background-position if it exists
        if (current.position) {
            document.body.style.backgroundPosition = current.position;
        } else {
            document.body.style.backgroundPosition = 'center center'; // Default position
        }

        // Apply background-size if it exists, otherwise default to 'cover'
        if (current.size) {
            document.body.style.backgroundSize = current.size;
        } else {
            document.body.style.backgroundSize = 'cover'; // Default size
        }

        document.body.style.backgroundRepeat = 'no-repeat'; // Prevents image repetition
    } else {
        document.body.style.backgroundImage = 'none'; // Clear image if color
        document.body.style.backgroundColor = current.value;
        document.body.style.backgroundPosition = ''; // Clear background position for colors
        document.body.style.backgroundSize = ''; // Clear background size for colors
        document.body.style.backgroundRepeat = ''; // Clear background repeat for colors
    }
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    // Schedule the next change based on the current background's timeout (converted to milliseconds)
    setTimeout(changeBackground, current.timeout * 1000);
}

changeBackground();
