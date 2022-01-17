export const getDate = () => {
    let dateMaster = new Date()
    let year = dateMaster.getFullYear()
    let month = dateMaster.getMonth() + 1
    if(month < 10) {
        month = `0${month}`
    }
    let date = dateMaster.getDate()
    let time = dateMaster.toTimeString().split(' ')[0]
    return `${year}:${month}:${date} ${time}`
}