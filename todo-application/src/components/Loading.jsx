import loadingImg from "../assets/loading.gif";

const Loading = () => {
    return(
        <div className="w-full h-full bg-black opacity-70 flex justify-center items-center">
            <img src={loadingImg} width={"100px"}/>
        </div>
    )
}

export default Loading;