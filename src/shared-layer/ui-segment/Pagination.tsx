type Props = {
    limit: number
    skip: number
    total: number
    onPageSelect: (pageNumber: number) => void
}

export function Pagination({limit, skip, total, onPageSelect}: Props) {
    const totalPagesCount = Math.ceil(total / limit)
    const currentPage = skip / limit + 1

    return <div style={{display: 'flex', flexDirection: "row"}}>
        {
            [...Array(totalPagesCount).fill(null)].map((_, index) => {
                return <div onClick={() => {
                    if (currentPage !== index + 1) {
                        onPageSelect(index + 1)
                    }
                }}
                            style={{border: currentPage === index + 1 ? "1px red solid" : ""}}>{index + 1}</div>
            })}
    </div>
}