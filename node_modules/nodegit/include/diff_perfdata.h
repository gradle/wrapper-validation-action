// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDIFFPERFDATA_H
#define GITDIFFPERFDATA_H
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
#include <git2/sys/diff.h>
}

#include "../include/typedefs.h"


using namespace node;
using namespace v8;

class GitDiffPerfdata;

struct GitDiffPerfdataTraits {
  typedef GitDiffPerfdata cppClass;
  typedef git_diff_perfdata cType;

  static const bool isDuplicable = false;
  static void duplicate(git_diff_perfdata **dest, git_diff_perfdata *src) {
     Nan::ThrowError("duplicate called on GitDiffPerfdata which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_diff_perfdata *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitDiffPerfdata : public
  NodeGitWrapper<GitDiffPerfdataTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDiffPerfdataTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitDiffPerfdata()
      : NodeGitWrapper<GitDiffPerfdataTraits>(
           "A new GitDiffPerfdata cannot be instantiated."
       )
    {}
    GitDiffPerfdata(git_diff_perfdata *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDiffPerfdataTraits>(raw, selfFreeing, owner)
    {}
    ~GitDiffPerfdata();
     static NAN_METHOD(StatCalls);
    static NAN_METHOD(OidCalculations);
};

#endif
