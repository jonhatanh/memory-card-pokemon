export const pokemon = {
  id: 470,
  name: 'leafeon',
  sprites: {
    normal:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/470.png',
    animated:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/470.gif'
  }
} as const;

export const audios = {
  success: '/assets/Pokemon-AButton.mp3',
  fail: '/assets/fail.mp3',
  backgroundMusic: '/assets/EternaForestCompressed.mp3'
} as const;

export type PokemonApi = {
  id: number;
  name: string;
  sprites: {
    versions: {
      'generation-v': {
        'black-white': {
          front_default: string;
          animated: {
            front_default: string;
          };
        };
      };
    };
  };
};


export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    normal: string;
    animated: string;
  };
};

export type PokemonList = Pokemon[];
