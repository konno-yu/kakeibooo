// TODO POSTとUPDATEでDTOを分けるのもあり
export interface MemoDto {
    fromDate: Date;
    toDate: Date;
    memoText: string;
}