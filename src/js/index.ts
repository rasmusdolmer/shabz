import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface ILog {
    id: number,
    name: string,
    date: Date,
    status: String
}

const uri: string = "https://shabzsmartlock20181127022710.azurewebsites.net/api/log";
//const uri: string = "https://localhost:44379/api/log";


let lockBtn : HTMLButtonElement = <HTMLButtonElement>document.getElementById("lockControlButton")
let logOutput : HTMLUListElement = <HTMLUListElement>document.getElementById("log");

function GetAllLogs(): void {
    axios.get<ILog[]>(uri)
        .then(function (response: AxiosResponse<ILog[]>): void {
            response.data.forEach((log: ILog) => {
                let li : HTMLLIElement = <HTMLLIElement>document.createElement("LI");
                li.innerHTML = log.name;
                let span : HTMLSpanElement = <HTMLSpanElement>document.createElement("SPAN");
                let todayOutput : string = <string>"";
                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth()+1;
                let date = today.getDate();
                let hour = today.getHours();
                let minute = today.getMinutes();
                if (hour < 10) {
                    hour =  +'0' + hour;
                }

                if (date < 10) {
                    date = +'0' + date;
                }

                if (month < 10) {
                    month = +'0' + month;
                }
                todayOutput = date + "-" + month + "-" + year + " " + hour + ":" + minute;
                span.innerHTML = todayOutput;
                li.appendChild(span);
                let p : HTMLParagraphElement = <HTMLParagraphElement>document.createElement("P");
                p.innerHTML = log.status.toString();
                if(log.status == "Locked"){
                    p.classList.add("locked");
                }
                li.appendChild(p);
                logOutput.appendChild(li);
            });
        })
        .catch(function (error: AxiosError): void {

        });
}

GetAllLogs();


lockBtn.addEventListener("click", function() :void{
    
    axios.post<ILog>(uri, {Name: "hej", Date: Date.now(), Status: "yo"})
    GetAllLogs();
});




