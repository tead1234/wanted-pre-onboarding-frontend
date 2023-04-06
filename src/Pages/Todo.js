export default function Todo() {
    // 약간 필기체 느낌으로 적는거면 좋겠음
    // 전체 할일을 관리하는 state를 만들고 state의 갯수만큼 반복문으로 생성하면 될듯??
    // checkbox를 누르면 취소선 생기는 효과넣기

    /// state 관리
    return(
        <>
            <div>
                <h2>오늘 할일</h2>
            </div>
            <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div>
                <label htmlFor="todo">밥먹기</label>
                <input
                    type="checkbox"
                    name="todo"
                >
                </input>
                </div>
                <div>
                <label htmlFor="todo">밥먹기</label>
                <input
                    type="checkbox"
                    name="todo"
                >
                </input>
                </div>
                <div>
                <label htmlFor="todo">밥먹기</label>
                <input
                    type="checkbox"
                    name="todo"
                >
                </input>
                </div>
                
            </div>
        </>
    );   
}