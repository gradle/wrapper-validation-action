// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDIFFSTATS_H
#define GITDIFFSTATS_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"

#include "../include/buf.h"
// Forward declaration.
struct git_diff_stats {
};

using namespace node;
using namespace v8;

class GitDiffStats;

struct GitDiffStatsTraits {
  typedef GitDiffStats cppClass;
  typedef git_diff_stats cType;

  static const bool isDuplicable = false;
  static void duplicate(git_diff_stats **dest, git_diff_stats *src) {
     Nan::ThrowError("duplicate called on GitDiffStats which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_diff_stats *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_diff_stats_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitDiffStats : public
  NodeGitWrapper<GitDiffStatsTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDiffStatsTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                

  private:
    GitDiffStats()
      : NodeGitWrapper<GitDiffStatsTraits>(
           "A new GitDiffStats cannot be instantiated."
       )
    {}
    GitDiffStats(git_diff_stats *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDiffStatsTraits>(raw, selfFreeing, owner)
    {}
    ~GitDiffStats();
                
    static NAN_METHOD(FilesChanged);

    static NAN_METHOD(Insertions);

    static NAN_METHOD(Deletions);

    struct DiffStatsToBufBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
      const git_diff_stats * stats;
      git_diff_stats_format_t format;
      size_t width;
    };
    class DiffStatsToBufWorker : public Nan::AsyncWorker {
      public:
        DiffStatsToBufWorker(
            DiffStatsToBufBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~DiffStatsToBufWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        DiffStatsToBufBaton *baton;
    };

    static NAN_METHOD(DiffStatsToBuf);
};

#endif
