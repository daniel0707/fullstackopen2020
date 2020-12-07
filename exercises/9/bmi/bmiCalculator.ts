type Result = 'Very severely underweight'
  | 'Severely underweight'
  | 'Underweight'
  | 'Normal (healthy weight)'
  | 'Overweight'
  | 'Obese Class I (Moderately obese)'
  | 'Obese Class II (Severely obese)'
  | 'Obese Class III (Very severely obese)'

interface bmiValues {
  height: number;
  mass: number;
}

const parseArgs = (args: Array<String>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = (height: number, mass: number): Result => {
  height = height / 100
  const val = mass / (height * height)
  if (val < 15) return 'Very severely underweight'
  else if (val < 16) return 'Severely underweight'
  else if (val < 18.5) return 'Underweight'
  else if (val < 25) return 'Normal (healthy weight)'
  else if (val < 30) return 'Overweight'
  else if (val < 35) return 'Obese Class I (Moderately obese)'
  else if (val < 40) return 'Obese Class II (Severely obese)'
  else return 'Obese Class III (Very severely obese)'
}

export const execute = () => {
  try {
    const { height, mass } = parseArgs(process.argv)
    console.log(calculateBmi(height, mass))
  } catch (e) {
    console.log("Error, ", e.message)
  }
}