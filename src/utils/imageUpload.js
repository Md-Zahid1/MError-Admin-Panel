import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';


const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'video/mp4',
    'video/quicktime',
    'audio/mpeg',
    'audio/wav',
    // Add more supported types as needed
];


export const handleFileChange = (event) => {
    console.log("ev", event)
    const selectedFile = event.target.files[0];
    if (allowedTypes.includes(selectedFile.type)) {
        console.log("message")
    } else {
        alert('Invalid file type. Only images and PDFs are allowed.');
    }
};

export const uploadFile = async (file) => {
    if (!file) {
        return
    }

    const S3_BUCKET = "merror-files"; // Replace with your bucket name
    const REGION = "ap-south-1"; // Replace with your region

    AWS.config.update({
        accessKeyId: "AKIAZQ3DRW2NGA3CMKFG",
        secretAccessKey: "VyQECAR6TLKePicx4JXWbq3cQK0Wj89y2SXpWYcN",
    });

    const s3 = new S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    });

    const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
    };
    try {
        const upload = await s3.upload(params).promise();
        console.log(upload);
        return upload.Location;

    } catch (error) {
        console.error(error);
        alert(`Error uploading file: ${error.message}`);
    }
};