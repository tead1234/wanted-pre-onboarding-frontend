export default function ModifyText(){
    return(
        // backgrpund
        <div className="w-screen h-screen bg-gradient-to-t from-sky-500 to-indigo-500 z-40">
            {/* 알림창 */}
            <div className="z-99">
                <h1>알림창입니다.</h1>
            </div>
            <button>완료</button>
            <button>취소</button>
        </div>
    );
}