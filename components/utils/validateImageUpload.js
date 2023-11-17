export function validateImage (file, formData)  {
    const MIN_SIZE_BYTES = 80 * 1048576; // 118 MB in bytes

    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("Select an image"));
            return;
        }

        // Ensure all form fields are filled out
        if (!formData.title || !formData.description || !formData.priceSmall || !formData.priceMedium || !formData.priceLarge) {
            reject(new Error("Please fill in all required fields."));
            return;
        }
        // Check file type
        if (file.type !== "image/tiff") {
            reject(new Error("Only .tiff files are allowed."));
            return;
        }

        // Check file size
        if (file.size < MIN_SIZE_BYTES) {
            reject(new Error("File size is too small, must be at least 80 MB."));
            return;
        }
        resolve()
    });
};
