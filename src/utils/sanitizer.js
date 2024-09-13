
export const sanitizer = (data) => {
    const { password, ...sanitizedData } = data;

    return sanitizedData;
}