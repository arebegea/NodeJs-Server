const filesSystem = require('fs');

//function that moves files from 1 location to another
module.exports.moveFiles = async function (files, uniqId) {

    let copySuccess = true;
    console.log('files are: ', files);
    if (files && Array.isArray(files)) {
        console.log('copy file fct if statement');
        files.forEach(async file => {
            try {
                const filePath = `${process.env.FILES_BASE_PATH}new/${file.serverFileName}`;
                const destinationPath = `${process.env.FILES_BASE_PATH}${uniqId}/${file.serverFileName}`;
                if (filesSystem.existsSync(filePath)) {
                    if (!filesSystem.existsSync(`${process.env.FILES_BASE_PATH}${uniqId}`)) {
                        await filesSystem.mkdirSync(`${process.env.FILES_BASE_PATH}${uniqId}`);
                    }
                    await filesSystem.promises.copyFile(filePath, destinationPath);
                    filesSystem.unlink(filePath, err => err ? console.log('error on delete ', err) : '');

                    // cfe, bug: "EBUSY: resource busy or locked" error is thrown 
                }
            } catch (e) {
                console.log('errror on copying files = ', e);
                copySuccess = false;
            }
        });
    }
    return copySuccess;
}