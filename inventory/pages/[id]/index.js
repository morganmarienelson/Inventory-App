

const Liquor = ({liquor}) => {
   const [confirm, setConfirm] = useState(false);
   const []
}

Liquor.getInitialProps = async ({query: {id}}) => {
    const res = await fetch(`http://localhost:3000/api/loungeDrinks/${id}`);
    const  data  = await res.json();

    return {liquor : data.data}
}