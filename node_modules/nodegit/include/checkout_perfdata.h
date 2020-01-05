// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCHECKOUTPERFDATA_H
#define GITCHECKOUTPERFDATA_H
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


using namespace node;
using namespace v8;

class GitCheckoutPerfdata;

struct GitCheckoutPerfdataTraits {
  typedef GitCheckoutPerfdata cppClass;
  typedef git_checkout_perfdata cType;

  static const bool isDuplicable = false;
  static void duplicate(git_checkout_perfdata **dest, git_checkout_perfdata *src) {
     Nan::ThrowError("duplicate called on GitCheckoutPerfdata which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_checkout_perfdata *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitCheckoutPerfdata : public
  NodeGitWrapper<GitCheckoutPerfdataTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitCheckoutPerfdataTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitCheckoutPerfdata()
      : NodeGitWrapper<GitCheckoutPerfdataTraits>(
           "A new GitCheckoutPerfdata cannot be instantiated."
       )
    {}
    GitCheckoutPerfdata(git_checkout_perfdata *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitCheckoutPerfdataTraits>(raw, selfFreeing, owner)
    {}
    ~GitCheckoutPerfdata();
     static NAN_METHOD(MkdirCalls);
    static NAN_METHOD(StatCalls);
    static NAN_METHOD(ChmodCalls);
};

#endif
