import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Info, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackendStatusIndicator } from '../components/common/BackendStatusIndicator';
import {
  MAX_MOVIELENS_USER_ID,
  MIN_MOVIELENS_USER_ID,
  useUser,
} from '../context/UserContext';

const PRESET_USER_IDS = [1, 42, 196, 276, 405, 655, 943];

export function Profile() {
  const { userId, setUserId, backendStatus } = useUser();
  const [inputValue, setInputValue] = useState<string>(String(userId));
  const [validationError, setValidationError] = useState<string | null>(null);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = Number.parseInt(inputValue.trim(), 10);
    if (
      !Number.isInteger(parsed) ||
      parsed < MIN_MOVIELENS_USER_ID ||
      parsed > MAX_MOVIELENS_USER_ID
    ) {
      setValidationError(
        `Please enter an integer MovieLens user ID between ${MIN_MOVIELENS_USER_ID} and ${MAX_MOVIELENS_USER_ID}.`,
      );
      setSavedToast(false);
      return;
    }

    setValidationError(null);
    setUserId(parsed);
    setSavedToast(true);
  };

  const handlePresetClick = (presetId: number) => {
    setValidationError(null);
    setInputValue(String(presetId));
    setUserId(presetId);
    setSavedToast(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <header className="border-b border-white/8 pb-6 space-y-2">
        <p className="text-xs font-medium text-[#E5A93C]">
          Academic Demonstration Profile
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F4F5]">
          MovieLens User Selection
        </h1>
        <p className="max-w-2xl text-sm text-[#A1A1AA] leading-relaxed">
          Select any MovieLens 100K user ID (1 to 943) to inspect how the
          FastAPI recommendation service ranks films and assigns experiment arms
          across different user histories.
        </p>
      </header>

      {/* Academic Disclaimer */}
      <div className="rounded-xl border border-white/10 bg-[#121216] p-5 flex items-start gap-3.5">
        <Info className="h-5 w-5 shrink-0 text-[#E5A93C] mt-0.5" aria-hidden="true" />
        <div className="space-y-1 text-sm text-[#A1A1AA] leading-relaxed">
          <p className="font-medium text-[#F4F4F5]">
            Dataset User ID — Not an Authenticated Account
          </p>
          <p className="text-xs">
            Vero Movies does not implement authentication or store personal user
            credentials. Selecting a user ID updates the{' '}
            <code className="font-mono text-[#F4F4F5]">
              GET /recommend/{'{user_id}'}
            </code>{' '}
            target and persists your demo selection locally. Experiment arm
            assignment (<code className="font-mono text-[#F4F4F5]">control</code>{' '}
            vs <code className="font-mono text-[#F4F4F5]">challenger</code>) is
            performed deterministically on the backend and cannot be overridden
            by the client.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* User Selector Card */}
        <div className="lg:col-span-7 rounded-xl border border-white/8 bg-[#121216] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/8 pb-4">
            <div className="flex items-center gap-2.5">
              <UserCheck className="h-4 w-4 text-[#E5A93C]" aria-hidden="true" />
              <h2 className="text-base font-semibold text-[#F4F4F5]">
                Active Dataset User
              </h2>
            </div>
            <span className="font-mono text-sm font-semibold text-[#E5A93C]">
              User #{userId}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="movielens-user-id"
                className="block text-xs font-medium text-[#A1A1AA] mb-2"
              >
                Enter MovieLens 100K User ID (1–943)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="movielens-user-id"
                  type="number"
                  min={MIN_MOVIELENS_USER_ID}
                  max={MAX_MOVIELENS_USER_ID}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setSavedToast(false);
                  }}
                  className="flex-1 rounded-lg border border-white/12 bg-[#09090B] px-3.5 py-2.5 font-mono text-sm text-[#F4F4F5] focus:border-[#E5A93C] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#E5A93C] px-5 py-2.5 text-sm font-semibold text-[#09090B] hover:bg-[#F0B952] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Apply User ID
                </button>
              </div>
              {validationError && (
                <p role="alert" className="mt-2 text-xs text-red-400">
                  {validationError}
                </p>
              )}
              {savedToast && !validationError && (
                <p
                  role="status"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-400"
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    Switched active recommendation user to User #{userId}.
                  </span>
                </p>
              )}
            </div>
          </form>

          <div className="space-y-2.5 pt-2 border-t border-white/8">
            <p className="text-xs font-medium text-[#A1A1AA]">
              Quick Sample MovieLens IDs
            </p>
            <div className="flex flex-wrap gap-2">
              {PRESET_USER_IDS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    userId === preset
                      ? 'bg-[#E5A93C] text-[#09090B] font-semibold'
                      : 'border border-white/10 bg-[#18181D] text-[#F4F4F5] hover:border-white/25'
                  }`}
                >
                  User #{preset}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#E5A93C] hover:text-[#F0B952] transition-colors"
            >
              <span>Test Recommendations for User #{userId}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Live Backend Serving Config */}
        <div className="lg:col-span-5 rounded-xl border border-white/8 bg-[#121216] p-6 space-y-5">
          <h2 className="text-base font-semibold text-[#F4F4F5]">
            Backend Serving State
          </h2>

          <BackendStatusIndicator />

          <div className="space-y-2">
            <p className="text-xs font-medium text-[#A1A1AA]">
              Active Serving Configuration (GET /config)
            </p>
            {backendStatus.config ? (
              <pre className="max-h-60 overflow-auto rounded-lg border border-white/8 bg-[#09090B] p-3.5 font-mono text-xs text-[#F4F4F5] leading-relaxed">
                {JSON.stringify(backendStatus.config, null, 2)}
              </pre>
            ) : (
              <p className="rounded-lg border border-white/8 bg-[#09090B] p-3.5 text-xs text-[#A1A1AA]">
                {backendStatus.checking
                  ? 'Fetching /config from FastAPI…'
                  : 'Configuration unavailable while backend is unreachable.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
