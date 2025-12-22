export function generateGUID() {
    return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const updateHotspots = (hotspots: any[]) => {
    return hotspots.map((c: { id: any; }) => ({
        ...c,
        id: c?.id || generateGUID()
    }));
};

export function GetImage(imagePath : string)
{
    const basePath = window.location.hostname === 'localhost' ? '/src/' : '/';
    return new URL(`${basePath}${imagePath}`, window.location.origin).toString();
}

export function findEnvVariableByKey(key) {
    // Check if the key exists in the environment variables
    if (import.meta.env.hasOwnProperty(key)) {
        return import.meta.env[key];
    } else {
        console.log(`No environment variable found with the key: ${key}`);
        return null;
    }
}