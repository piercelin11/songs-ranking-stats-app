function alterDateFormat(date: Date | null){
    if (!date) return "No Date"

    const d = new Date(date);

    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}.${month}.${day}`;
    return formattedDate;
}

function alterDateFormatDash(date: Date | null){
    if (!date) return "No Date"
    const d = new Date(date);

    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

function alterDateFormatToLong(date: Date | null){
    if (!date) return "No Date"
    
    const originalDate = new Date(date);
    const formattedDate = originalDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    return formattedDate
}

function numberToMonthName(num: number) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return months[num];
}

export { alterDateFormat, alterDateFormatToLong, numberToMonthName, alterDateFormatDash };