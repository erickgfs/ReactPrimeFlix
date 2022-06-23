import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './filme-info.css'

import api from '../../services/api';

const Filme = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '3613f89a2dbf54d2664db420de5dc0a1',
                    language: "pt-BR",
                }
            }).then((response) => {
                setFilme(response.data);
                setLoading(false);
            }).catch(() => {
                navigate("/", { replace:true })
                return;
            })
        }

        loadFilme();

        return () => {console.log('pag desmontada')}
    }, [id, navigate])

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeFlix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

        if(hasFilme) {
            toast.warn("Filme ja esta na lista!");
            return;
        } 

        filmesSalvos.push(filme);

        localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');
    }

    if(loading) {
        return(
            <div className='filme-info'>
                <h1>
                    Carregando detalhes do filme...
                </h1>
            </div>
        )
    } else {
        return (
            <div className='filme-info'>
                <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

                <h3>Sinopse</h3>
                <span>{filme.overview}</span>
                <strong>Avaliação: {filme.vote_average} / 10</strong>

                <div className='area-button'>
                    <button onClick={ salvarFilme }>Salvar</button>
                    <button>
                        <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title}+Trailer`}>Trailer</a>
                    </button>
                </div>
            </div>
        ); 
    }

}
export default Filme;