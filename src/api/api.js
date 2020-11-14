import axios from 'axios';

const getGnomes = () => {
    const results = axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
        return results;
}

export { getGnomes }