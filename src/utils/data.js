export const userQuery = (userId)=>{
    const query = `*[_type == "user" && _id == '${userId}' ]`;
    return query;
}
export const SearchQuery = (SearchTerm)=>{
    const query = `*[_type == "pin" && category match == '${SearchTerm}*' || title match == '${SearchTerm}*' about match ==${SearchTerm}*']{
        image{
            assets -> {
                url
            },
            _id,
            destination,
            postedBy->{
                _id,
                userName,
                image
            },
            save[]{
                _key,
                postedBy->{
                    _id,
                    userName,
                    image
                }
            }
        }
    }`;

    return query;

}