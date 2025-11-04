-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create MCQ questions table
CREATE TABLE public.mcq_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  explanation TEXT,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.mcq_questions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone authenticated can view MCQ questions
CREATE POLICY "Authenticated users can view MCQ questions"
ON public.mcq_questions
FOR SELECT
TO authenticated
USING (true);

-- Policy: Authenticated users can insert MCQ questions
CREATE POLICY "Authenticated users can create MCQ questions"
ON public.mcq_questions
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_mcq_questions_updated_at
BEFORE UPDATE ON public.mcq_questions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample MCQ questions for chemistry A-Level
INSERT INTO public.mcq_questions (question, option_a, option_b, option_c, option_d, correct_answer, explanation, topic, difficulty) VALUES
(
  'What is the electron configuration of a neutral chlorine atom?',
  '1s² 2s² 2p⁶ 3s² 3p⁵',
  '1s² 2s² 2p⁶ 3s² 3p⁶',
  '1s² 2s² 2p⁶ 3s² 3p⁴',
  '1s² 2s² 2p⁶ 3s¹ 3p⁶',
  'A',
  'Chlorine has 17 electrons. Following the Aufbau principle: 1s² (2e⁻) + 2s² (2e⁻) + 2p⁶ (6e⁻) + 3s² (2e⁻) + 3p⁵ (5e⁻) = 17 electrons total.',
  'Atomic Structure',
  'Medium'
),
(
  'Which type of bond is formed when electrons are shared between two atoms?',
  'Ionic bond',
  'Covalent bond',
  'Metallic bond',
  'Hydrogen bond',
  'B',
  'A covalent bond is formed when two atoms share one or more pairs of electrons. This typically occurs between non-metal atoms.',
  'Chemical Bonding',
  'Easy'
),
(
  'What is the oxidation state of sulfur in H₂SO₄?',
  '+4',
  '+6',
  '+2',
  '-2',
  'B',
  'In H₂SO₄: H is +1 (×2 = +2), O is -2 (×4 = -8). For the molecule to be neutral: (+2) + S + (-8) = 0, therefore S = +6.',
  'Redox Chemistry',
  'Hard'
),
(
  'What is the molecular geometry of methane (CH₄)?',
  'Linear',
  'Trigonal planar',
  'Tetrahedral',
  'Bent',
  'C',
  'Methane has 4 bonding pairs and no lone pairs on the central carbon atom, resulting in a tetrahedral geometry with bond angles of 109.5°.',
  'Molecular Structure',
  'Medium'
);